import { Box, Typography } from "@mui/material";

export default function MonthlyInsights({ data }) {
  if (!data) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">AI Insights</Typography>

      <Typography sx={{ mt: 1 }}>
        Total Spent: ₹{data.summary.totalSpent}
      </Typography>

      <Typography sx={{ mt: 2 }}>Observations</Typography>
      <ul>
        {data.insights.observations.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ul>

      <Typography>Warnings</Typography>
      <ul>
        {data.insights.warnings.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>

      <Typography>Suggestions</Typography>
      <ul>
        {data.insights.suggestions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </Box>
  );
}
