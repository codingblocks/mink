using System;
using System.Collections.Generic;

namespace mink.Domain.Data
{
  public class KafkaClientConfigProperties : BaseModel
  {
    public Guid ConfigId { get; set; }
    public string Property { get; set; }
    public string Value { get; set; }

    public void Save()
    {
      Execute(@"
        INSERT INTO mink.kafka_client_config_properties (config_id, property, value)
        VALUES(@ConfigId, @Property, @Value)
        ON CONFLICT(config_id, property)
        DO UPDATE SET value = @value
      ", this);
    }

    public IEnumerable<KafkaClientConfigProperties> Get()
    {
      return Query<KafkaClientConfigProperties>(@"
        SELECT * FROM mink.kafka_client_config_properties WHERE config_id = @ConfigId
      ", this);
    }
  }
}
