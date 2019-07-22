﻿using Dapper;
using Npgsql;
using System.Collections.Generic;
using System.Data;

namespace mink.Domain.Data
{
  public abstract class BaseModel
  {
    private IDbConnection Connection
    {
      get
      {
        return new NpgsqlConnection("User ID=postgres;Password=postgres;Host=localhost;Port=5432;Database=postgres;Pooling=true;"); // TODO
      }
    }

    internal int Execute(string query, object parameters)
    {
      using (var c = Connection)
      {
        return c.Execute(query, parameters);
      }
    }

    internal IEnumerable<T> Query<T>(string query, object parameters)
    {
      using (var c = Connection)
      {
        return c.Query<T>(query, parameters);
      }
    }
  }
}