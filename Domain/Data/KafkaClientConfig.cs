using Dapper; // TODO
using System;

namespace mink.Domain.Data
{
  public class KafkaClientConfig : BaseModel
  {
    public Guid ConfigId { get; set; }
    public string Name { get; set; }
    public DateTime Created { get; set; }
    public bool Enabled { get; set; }

    public void Save()
    {
      // TODO being really lazy
      Execute(@"
        INSERT INTO mink.kafka_client_config (config_id, name, created, enabled)
        VALUES(@ConfigId, @Name, @Created, @Enabled)
        ON CONFLICT (Name)
        DO UPDATE SET name = @Name, created = @Created, enabled = @Enabled
      ", this);
    }
  }
}
