SELECT
  *
FROM
  dak.vigile
WHERE
  mum_cni IS NOT NULL
  AND mum_cni <> ''
  AND mum_cni IN (
    SELECT
      mum_cni
    FROM
      dak.vigile
    WHERE
      mum_cni IS NOT NULL
      AND mum_cni <> ''
    GROUP BY
      mum_cni
    HAVING
      COUNT(*) > 1
  )
ORDER BY
  mum_cni;

SELECT
  *
FROM
  dak.vigile
WHERE
  mum_cni IS NULL
  OR mum_cni = ''
ORDER BY
  mum_cni;

SELECT
  *
FROM
  dak.vigile
WHERE
  noms IS NOT NULL
  AND noms <> ''
  AND noms IN (
    SELECT
      noms
    FROM
      dak.vigile
    WHERE
      noms IS NOT NULL
      AND noms <> ''
    GROUP BY
      noms
    HAVING
      COUNT(*) > 1
  )
ORDER BY
  noms;
