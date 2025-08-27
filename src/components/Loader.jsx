import PropTypes from "prop-types"

function Loader({ text }){
return (
    <div className="flex flex-col items-center justify-center p-4">
         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
         {text && <p className="mt-2 text-gray-600">{text}</p>}
       </div>
);
}

Loader.propTypes = {
    text : PropTypes.string,
};

Loader.defaultProps = {
    text : "Chargement...."
}

export default Loader;