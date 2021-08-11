// import adamHead from "../../assets/3D/adamHead.gltf";

import AdminNav from "../../components/nav/adminNav";

interface ModelViewerJSX {
  src: string;
  poster?: string;
  // ... others
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerJSX &
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const AdminDashboard = () => {

  
  return (
    <div className="flex">
      <div className="mr-20">
        <AdminNav />
      </div>

      <div>
        <model-viewer
          className="model-viewer-canvas"
          src={"https://res.cloudinary.com/demo/image/upload/DamagedHelmet3D.glb"}


            // "https://github.com/google/model-viewer/blob/master/packages/shared-assets/models/Astronaut.glb?raw=true"          }
          auto-rotate
          camera-controls
        ></model-viewer>
      </div>
    </div>
  );
};

export default AdminDashboard;
