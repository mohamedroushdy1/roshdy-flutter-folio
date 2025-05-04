
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X } from "lucide-react";

interface ProjectImageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  projectName: string;
  currentImageIndex?: number;
}

const ProjectImageModal = ({
  open,
  onOpenChange,
  images,
  projectName,
  currentImageIndex = 0,
}: ProjectImageModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-1">
        <DialogTitle className="flex justify-between items-center p-4">
          <span>{projectName}</span>
          <DialogClose className="rounded-full hover:bg-gray-100 p-2">
            <X className="h-4 w-4" />
          </DialogClose>
        </DialogTitle>
        <div className="p-1">
          <Carousel
            className="w-full"
            defaultIndex={currentImageIndex}
          >
            <CarouselContent>
              {images.map((image, i) => (
                <CarouselItem key={i}>
                  <div className="flex flex-col items-center justify-center p-2">
                    <div className="w-full aspect-[9/16] md:aspect-[3/2] lg:aspect-[16/9] relative rounded-lg overflow-hidden border shadow-lg">
                      <img
                        src={image}
                        alt={`${projectName} screenshot ${i + 1}`}
                        className="w-full h-full object-contain bg-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(image, "_blank");
                        }}
                        style={{ cursor: "zoom-in" }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Click image to view full size</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectImageModal;
