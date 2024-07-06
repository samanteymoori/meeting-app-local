const Default = () => {
  const menu = [
    {
      title: "Search",
      key: "search",
    },
    {
      title: "Online",
      key: "online",
    },
    {
      title: "Smart Pick",
      key: "smart-pick",
    },
  ];
  return (
    <div className="bg-yellow-200 h-full ">
      <div className="mt-4 bg-red-500 p-4">
        {menu.map((menuitem) => (
          <div className="grid p-8 mx-auto px-4 mt-4 bg-red-100 w-40 my-4 text-center text-bold text-xl rounded-lg">
            {menuitem.title}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Default;
