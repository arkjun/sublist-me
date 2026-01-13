-- Update existing subscriptions with logo URLs from service providers
UPDATE subscriptions
SET logo_url = (
  SELECT sp.logo_url
  FROM service_providers sp
  WHERE json_extract(sp.names, '$.ko') = subscriptions.name
     OR json_extract(sp.names, '$.en') = subscriptions.name
  LIMIT 1
)
WHERE logo_url IS NULL;
