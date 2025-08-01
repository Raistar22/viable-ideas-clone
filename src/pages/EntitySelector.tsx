// EntitySelector.tsx
import { Building2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const entities = [
  {
    id: "riffle-inc",
    name: "Riffle Inc",
    region: "US",
    type: "Inc",
    color: "bg-yellow-200 hover:bg-yellow-300",
    textColor: "text-gray-900"
  },
  {
    id: "riffle-studio",
    name: "Riffle Studio Private Limited",
    region: "India",
    type: "Pvt Ltd",
    color: "bg-orange-300 hover:bg-orange-400",
    textColor: "text-gray-900"
  },
  {
    id: "deo-studios",
    name: "Deo Studios",
    region: "India",
    type: "LLP",
    color: "bg-orange-300 hover:bg-orange-400",
    textColor: "text-gray-900"
  },
  {
    id: "ember-labs",
    name: "Ember Labs",
    region: "India",
    type: "LLP",
    color: "bg-orange-300 hover:bg-orange-400",
    textColor: "text-gray-900"
  }
];

export const EntitySelector = () => {
  const navigate = useNavigate();

  const handleSelectEntity = (id: string) => {
    navigate(`/entities/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Building2 className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Select Entity
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the entity you want to manage documents for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {entities.map((entity) => (
            <button
              key={entity.id}
              onClick={() => handleSelectEntity(entity.id)}
              className={`${entity.color} ${entity.textColor} p-8 rounded-2xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg group`}
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-gray-700" />
                  <span className="ml-2 text-sm font-medium">{entity.region}</span>
                </div>
                <h3 className="text-xl font-medium mb-2 leading-tight">
                  {entity.name}
                </h3>
                <div className="text-sm text-gray-700 bg-white/30 rounded-lg px-3 py-1 inline-block">
                  {entity.type}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500">
            Documents are organized by entity for easy access and compliance tracking
          </p>
        </div>
      </div>
    </div>
  );
};

export default EntitySelector;
