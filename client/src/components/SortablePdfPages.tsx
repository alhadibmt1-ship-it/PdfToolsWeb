import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type PdfPage } from "@/hooks/usePdfThumbnails";

interface SortablePageCardProps {
  page: PdfPage;
  index: number;
  onRemove: (index: number) => void;
}

function SortablePageCard({ page, index, onRemove }: SortablePageCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `page-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-lg border bg-card overflow-visible"
      data-testid={`page-card-${index}`}
    >
      <div className="absolute -top-2 -right-2 z-10">
        <Button
          size="icon"
          variant="destructive"
          className="h-6 w-6 rounded-full"
          onClick={() => onRemove(index)}
          data-testid={`button-remove-page-${index}`}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-3"
      >
        <div className="absolute top-3 left-3 z-10">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>

        {page.thumbnail ? (
          <img
            src={page.thumbnail}
            alt={`Page ${page.pageNumber} from ${page.fileName}`}
            className="w-full rounded border bg-white"
          />
        ) : (
          <div className="w-full aspect-[3/4] rounded border bg-muted flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">📄</div>
              <div className="text-xs text-muted-foreground">
                Preview unavailable
              </div>
            </div>
          </div>
        )}

        <div className="mt-2 text-xs text-muted-foreground text-center truncate">
          {page.fileName} - Page {page.pageNumber}
        </div>
        <div className="text-xs text-center font-medium">
          #{index + 1}
        </div>
      </div>
    </div>
  );
}

interface SortablePdfPagesProps {
  pages: PdfPage[];
  onChange: (pages: PdfPage[]) => void;
}

export default function SortablePdfPages({
  pages,
  onChange,
}: SortablePdfPagesProps) {
  const [items, setItems] = useState(pages);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setItems(pages);
  }, [pages]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((_, i) => `page-${i}` === active.id);
      const newIndex = items.findIndex((_, i) => `page-${i}` === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      onChange(newItems);
    }
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onChange(newItems);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {items.length} page{items.length !== 1 ? "s" : ""} ready to merge
        </h3>
        <p className="text-xs text-muted-foreground">
          Drag to reorder • Click X to remove
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map((_, i) => `page-${i}`)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {items.map((page, index) => (
              <SortablePageCard
                key={`page-${index}`}
                page={page}
                index={index}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
