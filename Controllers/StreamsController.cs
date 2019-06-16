using Microsoft.AspNetCore.Mvc;
using mink.Domain;
using System;
using System.Linq;

namespace mink.Controllers
{
  [Route("api/[controller]")]
  public class StreamsController : Controller
  {

    [HttpDelete("kill/{keys}")]
    public void Kill(string keys)
    {
      if (string.IsNullOrEmpty(keys))
      {
        throw new Exception("No keys passed");
      }
      keys.Split(",").ToList().ForEach(x => ProcessTracker.Kill(x));
    }
  }
}