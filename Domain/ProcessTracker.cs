
using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.IO;

namespace mink.Domain
{
  // TODO DI
  public static class ProcessTracker
  {
    // TODO Move me, DI
    private static ConcurrentDictionary<string, Process> RunningProcesses = new ConcurrentDictionary<string, Process>();
    const string NEWLINE = "\n"; // NOTE: This should NOT be the environment newline because the enviornment we're talking to may be different than the one this is running in

    public static void Write(string key, string input)
    {
      var massagedInput = input == "\r" ? NEWLINE : input;
      RunningProcesses[key].StandardInput.Write(massagedInput);
    }

    public static void WriteLine(string key, string input)
    {
      RunningProcesses[key].StandardInput.Write(input + NEWLINE);
    }

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
          UseShellExecute = false,
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

      // TODO semaphore
      // Assume that there can only be one copy of the same command
      RunningProcesses[key] = process;
      WriteLine(key, command);
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