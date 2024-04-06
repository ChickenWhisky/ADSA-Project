import { useRef } from 'react'
import { Tooltip, Button } from '@mantine/core'
import save from "../../assets/images/saveIcon.svg"
import logout from "../../assets/images/logoutIcon.svg"

const Navbar = () => {

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

        console.log('fileObj is', fileObj);

        // 👇️ reset file input
        event.target.value = null;

        // 👇️ is now empty
        console.log(event.target.files);

        // 👇️ can still access file object here
        console.log(fileObj);
        console.log(fileObj.name);
    };


    return (
        <nav className="shadow-lg flex flex-row items-center justify-between w-full fixed h-[10vh] px-8">
            <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
            />

            <ul className="flex flex-row justify-between items-center text-2xl w-[15%]">
                <li>File</li>
                <li onClick={handleClick}>Open</li>
                <li>View</li>
            </ul>

            <ul className='flex flex-row justify-between items-center w-[8%]'>
                <Tooltip label="Save" placement="bottom" position='bottom'>
                    <li><img aria-label="Save File" className="w-[60%] hover:cursor-pointer" src={save} alt="" /></li>
                </Tooltip>
 
                <Tooltip label="Logout" color='green' position='bottom' arrowPosition='center' offset={1000}>
                    <Button aria-label='logout'><img className="w-[60%] hover:cursor-pointer" src={logout} alt="" /></Button>
                    {/* <button label="logout"> Logout </button> */}
                </Tooltip>
            </ul>
        </nav>
    )
}

// export default Navbar;