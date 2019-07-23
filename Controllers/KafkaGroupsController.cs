using Confluent.Kafka;
using Microsoft.AspNetCore.Mvc;
using mink.Domain.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace mink.Controllers
{
    [Route("api/[controller]")]
  public class KafkaGroupsController
  {
    [HttpGet]
    public IEnumerable<GroupInfo> Get()
    {
      var properties = (new KafkaClientConfigProperties { ConfigId = Guid.Parse(Environment.GetEnvironmentVariable("MINK_DEFAULT_KAFKA_CONFIG_ID")) })
        .Get()
        .Select(x => new KeyValuePair<string,string>(x.Property, x.Value)); // TODO

      var client = new Confluent.Kafka.AdminClientBuilder(properties).Build();
      return client.ListGroups(new TimeSpan(0, 0, 30)); // TODO
    }
  }
}
