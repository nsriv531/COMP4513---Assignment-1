const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://frliavqmdfgpjdqxxtol.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const express = require("express");
const app = express();

app.get("/api/circuits", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("races")
      .select(`circuits(*)`);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "No circuits found" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

app.get("/api/seasons", async (req, res) => {
  try {
    const { data, error } = await supabase.from("seasons").select("*");

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "No seasons found" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get circuits by reference
app.get("/api/circuits/:ref", async (req, res) => {
  const circuitRef = req.params.ref;
  try {
    const { data, error } = await supabase
      .from("circuits")
      .select("*")
      .eq("circuitRef", circuitRef);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "Circuit not found" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get all constructors
app.get("/api/constructors", async (req, res) => {
  try {
    const { data, error } = await supabase.from("constructors").select("*");

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "No constructors found" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get all drivers
app.get("/api/drivers", async (req, res) => {
  try {
    const { data, error } = await supabase.from("drivers").select("*");

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "No drivers found" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get constructors by reference
app.get("/api/constructors/:ref", async (req, res) => {
  const constructorRef = req.params.ref;
  try {
    const { data, error } = await supabase
      .from("constructors")
      .select("*")
      .eq("constructorRef", constructorRef);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "Constructor not found" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get constructors by season
app.get("/api/constructors/season/:year", async (req, res) => {
  const year = req.params.year;
  try {
    const { data, error } = await supabase
      .from("constructors")
      .select("*")
      .in(
        "constructorid",
        supabase
          .from("qualifying")
          .select("constructorid")
          .eq("year", year)
      );

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error: "No constructors found for the specified season",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get drivers by reference
app.get("/api/drivers/:ref", async (req, res) => {
  const driverRef = req.params.ref;
  try {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .eq("driverRef", driverRef);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "Driver not found" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Search drivers by substring
app.get("/api/drivers/search/:substring", async (req, res) => {
  const substring = req.params.substring;
  try {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .ilike("name", `%${substring}%`);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "No drivers found matching the substring" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get drivers by season
app.get("/api/driver/season/:year", async (req, res) => {
  const year = req.params.year;
  try {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .in(
        "driverid",
        supabase
          .from("qualifying")
          .select("driverid")
          .eq("year", year)
      );

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error: "No drivers found for the specified season",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get drivers by race
app.get("/api/driver/races/:raceId", async (req, res) => {
  const raceId = req.params.raceId;
  try {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .in(
        "driverid",
        supabase
          .from("qualifying")
          .select("driverid")
          .eq("raceid", raceId)
      );

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "No drivers found for the specified race" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});


app.get("/api/races/:raceId", async (req, res) => {
  const raceId = req.params.raceId;
  try {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("raceId", raceId);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "Race not found" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get races by season
app.get("/api/races/season/:year", async (req, res) => {
  const year = req.params.year;
  try {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("year", year);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "No races found for the specified season" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get races by season and round
app.get("/api/races/season/:year/round/:round", async (req, res) => {
  const year = req.params.year;
  const round = req.params.round;
  try {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("year", year)
      .eq("round", round);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error: "No races found for the specified season and round",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get race by circuit reference
app.get("/api/race/circuits/:ref", async (req, res) => {
  const circuitRef = req.params.ref;
  try {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("circuitRef", circuitRef);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error: "No races found for the specified circuit reference",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get races by circuit reference, season, and range of rounds
app.get("/api/races/circuits/:ref/season/:start/:end", async (req, res) => {
  const circuitRef = req.params.ref;
  const startRound = req.params.start;
  const endRound = req.params.end;
  try {
    const { data, error } = await supabase
      .from("races")
      .select("*")
      .eq("circuitRef", circuitRef)
      .gte("round", startRound)
      .lte("round", endRound);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error:
          "No races found for the specified circuit reference and round range",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get results by raceId
app.get("/api/results/:raceId", async (req, res) => {
  const raceId = req.params.raceId;
  try {
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("raceId", raceId);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({ error: "Results not found for the specified race" });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get results by driver reference
app.get("/api/results/driver/:ref", async (req, res) => {
  const driverRef = req.params.ref;
  try {
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("driverRef", driverRef);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error: "Results not found for the specified driver",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get results by driver reference within a range of seasons
app.get("/api/results/drivers/:ref/seasons/:start/:end", async (req, res) => {
  const driverRef = req.params.ref;
  const startYear = req.params.start;
  const endYear = req.params.end;
  try {
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("driverRef", driverRef)
      .gte("year", startYear)
      .lte("year", endYear);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error: "Results not found for the specified driver and season range",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get qualifying results by raceId
app.get("/api/qualifying/:raceId", async (req, res) => {
  const raceId = req.params.raceId;
  try {
    const { data, error } = await supabase
      .from("qualifying")
      .select("*")
      .eq("raceId", raceId);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error: "Qualifying results not found for the specified race",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get driver standings by raceId
app.get("/api/standings/drivers/:raceId", async (req, res) => {
  const raceId = req.params.raceId;
  try {
    const { data, error } = await supabase
      .from("driver_standings")
      .select("*")
      .eq("raceId", raceId);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error: "Driver standings not found for the specified race",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

// Get constructor standings by raceId
app.get("/api/standings/constructors/:raceId", async (req, res) => {
  const raceId = req.params.raceId;
  try {
    const { data, error } = await supabase
      .from("constructor_standings")
      .select("*")
      .eq("raceId", raceId);

    if (error) return res.json({ error: `${error.message}` });

    if (!data || data.length === 0) {
      return res.json({
        error: "Constructor standings not found for the specified race",
      });
    }
    res.send(data);
  } catch {
    res.json({ error: "Server error" });
  }
});

app.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
  }
);
