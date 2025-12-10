function Modal({children, handleToggle}) {

   function handleToggleModal(e){
        if(e.target.id === "modal"){
            handleToggle()
        }
    }

    return (
    <div id="modal" onClick={handleToggleModal}
      className="fixed inset-0 bg-black/25 bg-opacity-25 backdrop-blur-sm 
    flex justify-center items-center z-50 h-s"
    >
      {children}
    </div>
  );
}

export default Modal
