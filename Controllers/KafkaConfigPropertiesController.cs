using Microsoft.AspNetCore.Mvc;
using mink.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

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

    [HttpPut]
    public (KafkaClientConfig config, IEnumerable<KafkaClientConfigProperties> properties) Save([FromBody] SaveKafkaPropertiesRequest request)
    {
      // TODO validation
      var configId = Guid.NewGuid();
      
      var config = new KafkaClientConfig
      {
        ConfigId = configId,
        Name = request.ConfigName,
        Enabled = true,
        Created = DateTime.Now,
      };

      var properties = request
        .Properties
        .Split("\n")
        .Select(x => Regex.Replace(x, "//.*", "").Trim()) // lazy removing comments
        .Where(x => x.Length > 0)
        .Select(x => x.Split('='))
        .Select(x => new KafkaClientConfigProperties
        {
          ConfigId = configId,
          Property = x[0],
          Value = x[1]
        });

      // TODO transaction
      config.Save();
      properties.ToList().ForEach(x => x.Save());

      // TODO should return from the db
      return (config, properties);
    }
  }
}