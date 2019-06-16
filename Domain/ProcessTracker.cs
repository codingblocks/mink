
using System;
using System.Collections.Concurrent;
using System.Diagnostics;

namespace mink.Domain
{
  // TODO DI
  public static class ProcessTracker
  {
    // TODO Move me, DI
    private static ConcurrentDictionary<string, Process> RunningProcesses = new ConcurrentDictionary<string, Process>();

    public static void Stream(string key, string command, Action<string> outputHandler)
    {
      // TODO Check if command already exists
      var process = new Process()
      {
        StartInfo = new ProcessStartInfo("cmd.exe")
        {
          RedirectStandardOutput = true,
          RedirectStandardInput = true,
          RedirectStandardError = true,
          UseShellExecute = false
        }
      };

      process.OutputDataReceived += new DataReceivedEventHandler(
        (sendingProcess, outLine) => outputHandler(outLine.Data)
      );

      process.ErrorDataReceived += new DataReceivedEventHandler(
        (sendingProcess, outLine) => outputHandler(outLine.Data)
      );

      process.Start();
      process.BeginOutputReadLine();
      process.BeginErrorReadLine();
      process.StandardInput.WriteLine(command);

      // TODO semaphore
      // Assume that there can only be one copy of the same command
      RunningProcesses[key] = process;
      process.WaitForExit();
    }

    public static void Kill(string key)
    {
      if (RunningProcesses.TryRemove(key, out var process))
      {
        try
        {
          process.CancelOutputRead();
          process.CancelErrorRead();
          process.Kill();

        }
        finally
        {
          process.Dispose();
        }
      }
      else
      {
        System.Diagnostics.Trace.WriteLine("Warning, no process to stop?"); // TODO real logging
      }
    }
  }
}