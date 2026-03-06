insert into turfs(name, city, sport, address, latitude, longitude, hourly_rate, available) values
('Arena Football Turf', 'Bangalore', 'Football', 'Indiranagar', 12.9716, 77.5946, 1800, true),
('Smash Court', 'Bangalore', 'Badminton', 'Koramangala', 12.9352, 77.6245, 900, true),
('Power Pitch', 'Mumbai', 'Cricket', 'Andheri', 19.1197, 72.8468, 2200, true)
on conflict do nothing;

insert into events(title, city, venue, latitude, longitude, starts_at) values
('Weekend 5v5 League', 'Bangalore', 'Indiranagar Ground', 12.9721, 77.5933, now() + interval '2 day'),
('Badminton Open', 'Bangalore', 'Koramangala Arena', 12.9341, 77.6238, now() + interval '4 day'),
('Corporate Cricket Cup', 'Mumbai', 'Andheri Sports Complex', 19.1181, 72.8472, now() + interval '6 day')
on conflict do nothing;
