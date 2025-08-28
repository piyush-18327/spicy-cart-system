import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: string;
  image: string;
  itemCount: number;
  description?: string;
}

export const CategoryCard = ({ category, image, itemCount, description }: CategoryCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-medium)] hover:-translate-y-1 border-border/50 cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden h-32">
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className="font-semibold text-lg">{category}</h3>
          <p className="text-sm opacity-90">{itemCount} items</p>
          {description && (
            <p className="text-xs opacity-80 mt-1">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};