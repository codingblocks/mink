
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace mink.Controllers
{
  public class CommunicationHub : Hub
  {
    private ConcurrentDictionary<string, Process> RunningProcesses = new ConcurrentDictionary<string, Process>();
    public void Logs(string id)
    {
      Stream($"docker logs --tail 100 --follow {id}", (o) =>
      {
        //Console.Out.WriteLine(o);
        Clients.All.SendAsync($"Logs-{id}", o);
      });
    }

    public void Stream(string command, Action<string> outputHandler)
    {
      // TODO Check if command already exists
      // TODO how to disconnect?
      var process = new Process()
      {
        StartInfo = new ProcessStartInfo("cmd.exe")
        {
          RedirectStandardOutput = true,
          RedirectStandardInput = true,
          UseShellExecute = false
        }
      };

      process.OutputDataReceived += new DataReceivedEventHandler(
        (sendingProcess, outLine) => outputHandler(outLine.Data)
      );

      process.Start();
      process.BeginOutputReadLine();
      process.StandardInput.WriteLine(command);

      // TODO semaphore
      // Assume that there can only be one copy of the same command
      RunningProcesses[command] = process;
      process.WaitForExit();
    }
  }
}