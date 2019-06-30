using Microsoft.AspNetCore.SignalR;
using mink.Domain;
using System;

namespace mink.Controllers
{
  public class CommunicationHub : Hub
  {
    public void Logs(string id)
    {
      var key = $"Logs-{id}";
      ProcessTracker.Stream(key, $"docker logs --tail 100 --follow {id}", (o) =>
      {
        Clients.All.SendAsync(key, o);
      });
    }

    public void Attach(string id)
    {
      var key = $"Attach-{id}";
      ProcessTracker.Stream(key, $"docker exec -i {id} bash", (o) =>
      {
        Clients.All.SendAsync(key, o);
      });
    }

    public void Write(string id, string input)
    {
      var key = $"Attach-{id}";
      ProcessTracker.Write(key, input);
    }
  }
}