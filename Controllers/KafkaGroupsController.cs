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
      var properties = (new KafkaClientConfigProperties { ConfigId = Guid.Parse("99ae80c2-3b09-4e24-a082-f46b523b17d8") })
        .Get()
        .Select(x => new KeyValuePair<string,string>(x.Property, x.Value)); // TODO

      var client = new Confluent.Kafka.AdminClientBuilder(properties).Build();
      return client.ListGroups(new TimeSpan(0, 0, 30)); // TODO
    }
  }
}
