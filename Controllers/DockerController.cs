using Docker.DotNet;
using Docker.DotNet.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace mink.Controllers
{
  [Route("api/[controller]")]
  public class DockerController : Controller
  {
    private const int WaitBeforeKillSeconds = 3;

    [HttpGet("containers/{id}")]
    public IEnumerable<ContainerListResponse> ContainerList(string id)
    {
      if (string.IsNullOrEmpty(id))
      {
        throw new Exception("Invalid ID");
      }
      using (var client = CreateClient())
      {
        var listParameters = new ContainersListParameters();
        listParameters.All = true;
        return id == "all"
            ? client.Containers.ListContainersAsync(listParameters).Result
            : client.Containers.ListContainersAsync(listParameters).Result.Where(x => x.ID == id);
      }
    }

    [HttpDelete("restart/{id}")]
    public void RestartContainers(string id)
    {
      if (string.IsNullOrEmpty(id))
      {
        throw new Exception("Invalid ID");
      }
      using (var client = CreateClient())
      {
        var containers = ContainerList(id);
        var parameters = new ContainerRestartParameters();
        parameters.WaitBeforeKillSeconds = WaitBeforeKillSeconds; // TODO Constant
        containers.ToList().ForEach(x => client.Containers.RestartContainerAsync(x.ID, parameters));
      }
    }

    [HttpDelete("stop/{id}")]
    public void StopContainers(string id)
    {
      if (string.IsNullOrEmpty(id))
      {
        throw new Exception("Invalid ID");
      }
      using (var client = CreateClient())
      {
        var containers = ContainerList(id);
        var stopParameters = new ContainerStopParameters();
        stopParameters.WaitBeforeKillSeconds = WaitBeforeKillSeconds; // TODO Constant
        containers.ToList().ForEach(x => client.Containers.StopContainerAsync(x.ID, stopParameters));
      }
    }

    private IDockerClient CreateClient()
    {
      return new DockerClientConfiguration(new Uri("npipe://./pipe/docker_engine")).CreateClient();
    }

  }
}