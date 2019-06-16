
using System.Collections.Concurrent;
using System.Diagnostics;
using Microsoft.AspNetCore.SignalR;
using mink.Domain;

namespace mink.Controllers
{
  public class CommunicationHub : Hub
  {
    // TODO Move me, DI
    private ConcurrentDictionary<string, Process> RunningProcesses = new ConcurrentDictionary<string, Process>();
    public void Logs(string id)
    {
      ProcessTracker.Stream($"Logs-{id}", $"docker logs --tail 100 --follow {id}", (o) =>
      {
        Clients.All.SendAsync($"Logs-{id}", o);
      });
    }
  }
}