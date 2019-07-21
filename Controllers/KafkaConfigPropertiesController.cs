using Microsoft.AspNetCore.Mvc;
using System;

namespace mink.Controllers
{
  [Route("api/[controller]")]
  public class KafkaConfigPropertiesController : Controller
  {
    public class SaveKafkaPropertiesRequest
    {
      public string ConfigName { get; set; }
      public string Properties { get; set; }
    }

    [HttpPost]
    public SaveKafkaPropertiesRequest Save([FromBody] SaveKafkaPropertiesRequest request)
    {
      Console.Out.WriteLine(request.ConfigName);
      Console.Out.WriteLine(request.Properties);
      // Save to db - return the new?
      return new SaveKafkaPropertiesRequest();
    }
  }
}