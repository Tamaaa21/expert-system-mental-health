/*
  # Insert Symptom Data

  Inserts the 12 expert-validated symptoms into the symptoms table
  with their respective expert certainty factor weights.
*/

INSERT INTO symptoms (code, statement, expert_weight, category) VALUES
  ('A001', 'Merasa sedih secara tiba-tiba tanpa alasan yang jelas', 0.3, 'emotional'),
  ('A002', 'Merasa lelah meskipun tidak melakukan aktivitas berat', 0.3, 'physical'),
  ('A003', 'Merasa tidak berharga atau rendah diri', 0.2, 'emotional'),
  ('A004', 'Kehilangan minat atau motivasi dalam beraktivitas', 0.4, 'behavioral'),
  ('A005', 'Mengalami sesak napas atau dada terasa sesak', 0.5, 'physical'),
  ('A006', 'Mengalami kesulitan tidur (insomnia)', 0.5, 'physical'),
  ('A007', 'Kehilangan nafsu makan atau makan berlebihan', 0.6, 'physical'),
  ('A008', 'Merasa lambat dalam bergerak atau berbicara', 0.4, 'physical'),
  ('A009', 'Tidak mampu merawat diri sendiri', 0.7, 'cognitive'),
  ('A010', 'Sulit berkonsentrasi atau membuat keputusan', 0.8, 'cognitive'),
  ('A011', 'Kesulitan dalam mengelola waktu dan tugas', 0.8, 'cognitive'),
  ('A012', 'Mengalami halusinasi atau pikiran yang tidak realistis', 0.6, 'cognitive')
ON CONFLICT (code) DO NOTHING;