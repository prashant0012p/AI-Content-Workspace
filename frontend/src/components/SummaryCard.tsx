import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string;
  value: number;
}

const SummaryCard = ({ title, value }: Props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;