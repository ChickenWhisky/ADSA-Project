import { useState, useRef, useEffect } from 'react';
import Button from "react-bootstrap/Button"
import save from "../../assets/images/saveIcon.svg"
import logout from "../../assets/images/logoutIcon.svg"
import upload from "../../assets/images/uploadFile.svg"
import newFile from "../../assets/images/newFile.svg"
import './TextEditor.css'
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';


const Navbar = ({ setFileName, setFileData, setIsCreatingFile }) => {
    useEffect(() => {
        fetch('')
    }, [])

    const inputRef = useRef(null);

    const handleClick = () => {
        // 👇️ open file input box on click of another element
        inputRef.current.click();
    };

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
        return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            console.log(fileContent);
            setFileData(oldData => (oldData + fileContent)); // Pass file content to TextEditor
        };
        reader.readAsText(fileObj);

        // console.log('fileObj is', fileObj);

        // 👇️ reset file input
        event.target.value = null;

        // 👇️ is now empty
        // console.log(event.target.files);

        // 👇️ can still access file object here
        // console.log(fileObj);
        // console.log(fileObj.name);
        setFileName(fileObj.name)
    };


    return (
        <nav className="bg-green-200 shadow-lg flex flex-row items-center justify-between w-full fixed h-[9vh] px-8">
            <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />

            <div className="flex flex-row justify-between items-center text-2xl w-[15%]">
                <button className='.nav-link' onClick={() => {setIsCreatingFile(true)}}> <img className="w-[3rem]" src={newFile} alt="New file" /> </button>
                <button onClick={handleClick}><img className="w-[3rem]" src={upload} alt="Upload file" /></button>
                <button className='.nav-link'>View</button>
            </div>

            <div className='flex flex-row justify-between items-center w-[8%]'>
                
                    <Button>
                        <img aria-label="Save File" className="w-[3rem] hover:cursor-pointer" src={save} alt="" />                        
                    </Button>
 
                
                    <Button aria-label='logout'><img className="w-[3rem] hover:cursor-pointer" src={logout} alt="" /></Button>
                    {/* <button label="logout"> Logout </button> */}
                
            </div>
        </nav>
    )
}




const TextEditor = () => {


    const [ fileData, setFileData ] = useState("");
    const [ isCreatingFile, setIsCreatingFile ] = useState(false);
    const [fileName, setFileName] = useState("");
    const [ fontSize, setFontSize ] = useState("20px");
    const [ saveSuccessful, setSaveSuccessful] = useState(false);
    
    const handleFontSizeChange = (event) => {
        setFontSize(event.target.value);
        document.getElementById("editor").style.fontSize = event.target.value;
    }

    const handleEditorChange = (event) => {
        const newValue = event.target.value;
        setFileData(newValue);
    };

    const editMessage = fileName.length === 0 ? (
        <h1 className='mb-8 text-center text-2xl'>Click the upload icon to edit a file</h1>
    ) : (
        <h1 className='mb-8 text-center text-2xl '>Now editing: <code className='text-xl'> "{ fileName }" </code></h1>
    )

    return (
        <div>
            <Navbar
                setFileName={setFileName}
                setFileData={setFileData}
                setIsCreatingFile={setIsCreatingFile}
            />

            <Modal centered="true" show={isCreatingFile}>
                <Modal.Header>
                    <Modal.Title >
                        <h1 className='text-red-500 text-center '>
                            Create file
                        </h1>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form action="">
                        <input className="border-gray border-[2px] border-solid rounded-lg p-2 w-full" type="text" placeholder='file name' />
                    </form>
                    <p className='mt-4 text-red-400'>File will be automatically saved in the <strong>Desktop</strong> folder </p>
                </Modal.Body>

                <Modal.Footer>
                    <div className='w-full flex flex-row items-center justify-end'>

                        <Button variant='secondary' onClick={() => {setIsCreatingFile(false)}}>
                            Cancel
                        </Button>

                        <Button onClick={() => {setSaveSuccessful(true)}} variant="success" className='w-[100]' >
                            Create
                        </Button>


                    </div>
                </Modal.Footer>
            </Modal>


            <div className="text-black pt-[20vh] flex flex-col">
                <nav className='w-[80%] ml-auto mr-auto flex flex-row items-center justify-end px-4 py-2'>
                    <input className="bg-violet-200 py-2 px-4 rounded-xl" type="text" placeholder='Enter font size' value={fontSize} onChange={handleFontSizeChange}/>
                    {/* <select name="" id="" className="py-2 rounded-lg w-[15%] ml-8">Theme
                        <option value=""></option>
                    </select> */}

                    <Dropdown >
                        <Dropdown.Toggle variant='success' id="dropdown-basic" >
                            Select theme
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='ddown'>
                            <Dropdown.Item href="www.youtube.com">Youtube</Dropdown.Item>
                            <Dropdown.Item href="www.google.com">Google</Dropdown.Item>
                            <Dropdown.Item href="www.chess.com">Chess</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </nav>
                { editMessage }

                <textarea 
                    placeholder='Start typing...'
                    value={ fileData } 
                    onChange={handleEditorChange} 
                    id="editor" 
                    className="p-4 text-black text-xl ml-auto mr-auto w-[80%] border-[3px] border-solid border-[#957dad]" 
                    name="" 
                    cols="30" 
                    rows="10"
                />
            </div>

            {/* <ToastContainer className="mb-4 mr-4 bg-blue-200 h-[20%]" position="bottom-end" show={saveSuccessful} delay={3000} autohide>
                <Toast className='bg-yellow-300'>
                    <div className='w-full h-full '>
                        File saved successfully
                    </div>
                </Toast>
            </ToastContainer> */}
            <ToastContainer position="bottom-end" className='mb-4 mr-4'>
                <Toast className='bg-blue-400' onClose={() => setSaveSuccessful(false)} show={setSaveSuccessful} delay={3000} autohide>
                    <Toast.Header className='bg-yellow-200'>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                        />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body className='bg-violet-300'>Woohoo, you're reading this text in a Toast!</Toast.Body>
                </Toast>
            </ToastContainer>

            {/* <Alert key={'danger'} dismissible={true}>
                Couldn't save file
            </Alert> */}


        </div>
    )
}

export default TextEditor;