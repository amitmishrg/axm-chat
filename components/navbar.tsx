export const Navbar = async () => {
  return (
    <>
      <div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 flex gap-3 items-center z-30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          className="w-10 fill-slate-700"
        >
          <rect width="256" height="256" fill="none" />
          <path d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48ZM172,96a12,12,0,1,1-12,12A12,12,0,0,1,172,96ZM96,184H80a16,16,0,0,1,0-32H96ZM84,120a12,12,0,1,1,12-12A12,12,0,0,1,84,120Zm60,64H112V152h32Zm32,0H160V152h16a16,16,0,0,1,0,32Z" />
        </svg>
        <h1 className="text-2xl font-semibold text-slate-700">
          Axiamatic <span className="text-slate-400">Bot</span>
        </h1>
      </div>
    </>
  );
};
