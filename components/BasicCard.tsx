import * as React from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  styled,

} from "@mui/material";

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  "& .MuiCardHeader-title": {
    fontSize: "1rem",
    fontWeight: 700,
  },
}));

type BasicCardProps = {
  content: React.ReactNode;
  title: string;
  action?: React.ReactNode;
};

const BasicCard: React.FC<BasicCardProps> = ({ content, title, action }) => {
  return (
    <Card sx={{ minWidth: 275, height: "100%" }}>
      <StyledCardHeader title={title} action={action} />
      <Divider />
      <CardContent >{content}</CardContent>
    </Card>
  );
};

export default BasicCard;
