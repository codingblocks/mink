using Docker.DotNet;
using Docker.DotNet.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace mink.Controllers
{
  [Route("api/[controller]")]
  public class DockerController : Controller
  {
    private const int WaitBeforeKillSeconds = 3;

    [HttpGet("containers")]
    public IEnumerable<ContainerListResponse> ContainerList(IEnumerable<string> ids)
    {
      using (var client = CreateClient())
      {
        var listParameters = new ContainersListParameters();
        listParameters.All = true;

        // TODO inefficient!!
        // TODO should check for invalid ID
        return ids == null || !ids.Any()
            ? client.Containers.ListContainersAsync(listParameters).Result
            : client.Containers.ListContainersAsync(listParameters).Result.Where(x => ids.Contains(x.ID));
      }
    }

    [HttpDelete("restart/{ids}")]
    public void RestartContainers(string ids)
    {
      if (string.IsNullOrEmpty(ids))
      {
        throw new Exception("No id passed");
      }
      using (var client = CreateClient())
      {
        var containers = ContainerList(ids.Split(","));
        var parameters = new ContainerRestartParameters();
        parameters.WaitBeforeKillSeconds = WaitBeforeKillSeconds; // TODO Constant
        containers.ToList().ForEach(x => client.Containers.RestartContainerAsync(x.ID, parameters));
      }
    }

    [HttpDelete("stop/{ids}")]
    public void StopContainers(string ids)
    {
      if (string.IsNullOrEmpty(ids))
      {
        throw new Exception("No id passed");
      }
      using (var client = CreateClient())
      {
        var containers = ContainerList(ids.Split(","));
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