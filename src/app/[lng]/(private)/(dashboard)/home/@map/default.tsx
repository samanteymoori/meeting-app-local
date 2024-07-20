import Map from "@/components/Map/Map";
import OpenMap from "@/components/Map/OpenMap";

const Default = () => {
  return (
    <div className="p-2 bg-white rounded-lg">
      <OpenMap posix={[51.505, -0.09]} />
    </div>
  );
};
export default Default;
