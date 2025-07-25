import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Button, Typography } from "@mui/material";
import { Card as MuiCard } from "@mui/material";
import type { BoardCardInterface } from "~/interface/boardInterface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  card: BoardCardInterface;
}

function Card(props: CardProps) {
  const { card } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card._id,
    data: { ...card },
  });

  const dndKitCardStyles = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #2ecc71" : undefined,
  };

  const shouldShowCardActions = () => {
    return (
      (Array.isArray(card?.memberIds) && !!card.memberIds.length) ||
      (Array.isArray(card?.comments) && !!card.comments.length) ||
      (Array.isArray(card?.attachments) && !!card.attachments.length)
    );
  };
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
        overflow: "unset",
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card.cover} />}

      <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography>{card.title}</Typography>
      </CardContent>
      {shouldShowCardActions() && (
        <CardActions sx={{ p: "0 4px 8px 4px" }}>
          {Array.isArray(card?.memberIds) && !!card.memberIds.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card.memberIds.length}
            </Button>
          )}
          {Array.isArray(card?.comments) && !!card.comments.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              {card.comments.length}
            </Button>
          )}
          {Array.isArray(card?.attachments) && !!card.attachments.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  );
}

export default Card;
