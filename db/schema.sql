create table if not exists turfs (
  id bigserial primary key,
  name text not null,
  city text not null,
  sport text not null,
  address text,
  latitude double precision,
  longitude double precision,
  hourly_rate numeric(10,2),
  available boolean default true
);

create table if not exists events (
  id bigserial primary key,
  title text not null,
  city text not null,
  venue text,
  latitude double precision,
  longitude double precision,
  starts_at timestamp
);

create index if not exists idx_turfs_city_sport on turfs(city, sport);
create index if not exists idx_events_geo on events(latitude, longitude);
