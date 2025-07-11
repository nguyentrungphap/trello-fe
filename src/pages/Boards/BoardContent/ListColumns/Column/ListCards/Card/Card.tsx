import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Button, Typography } from "@mui/material";
import { Card as MuiCard } from "@mui/material";
import type { BoardCardInterface } from "@/interface/boardInterface";
interface CardProps {
  temporaryHideMedia?: boolean;
  card: BoardCardInterface;
  columnId: string;
}

function Card(props: CardProps) {
  const { temporaryHideMedia, card, columnId } = props;
  console.log({ card, columnId });
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
          <Typography>card test</Typography>
        </CardContent>
      </MuiCard>
    );
  }
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={card.cover!}
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography>{card.title}</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          {Array.isArray(card.memberIds) ? card.memberIds.length : 0}
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          {Array.isArray(card.comments) ? card.comments.length : 0}
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          {Array.isArray(card.attachments) ? card.attachments.length : 0}
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
