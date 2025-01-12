import React, { useEffect, useState } from "react";
import Navbar from "../../componets/Navbar/Navbar";
import NoteCard from "../../componets/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment"
import Tost from "../../ToastMessage/Tost";
import EmptyCard from "../../componets/EmptyCard/EmptyCard";
import AddNotesImg from "../../assets/images/1.png"
import NodataImg from "../../assets/images/2.jpeg"



const Home = () => {

    const [openAddEditModel, setOpenAddEditModel] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [showToastmgs, setShowToastmgs] = useState({
        isShown: false,
        message: "",
        type: "add"
    })

    const [allNotes, setAllNotes] = useState([])
    const [userInfo, setUserInfo] = useState(null);
    const navigete = useNavigate();

    const [isSerch, setIsSerch] = useState(false)

    const handleEdit = (noteDetails) => {
        setOpenAddEditModel({ isShown: true, data: noteDetails, type: "edit" });
    };

    const showToastMessage = (message, type = "info") => {
        setShowToastmgs({
            isShown: true,
            message,
            type,
        });
    };

    const handleCloseToast = () => {
        setShowToastmgs({
            isShown: false,
            message: "",
        });
    };

    // get Users Info
    const getuserInfo = async () => {
        try {
            const response = await axiosInstance.get("get-user");
            if (response.data && response.data.user) {
                setUserInfo(response.data.user);
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigete("/login")
            }
        }
    }

    // Get all Note
    const getallNote = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes");
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("An Unexpexted error occurred.");

        }
    }

    //Delete Note
    const deleteNote = async (data) => {
        const noteId = data._id
        try {
            const response = await axiosInstance.delete("/delete-note/" + noteId)
            if (response.data && !response.data.error) {
                showToastMessage("Note Deleted Successfully", "delete")
                getallNote();
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                console.log("An Unexpexted error occurred.");
            }
        }
    };


    //Serch For Note
    const onSerchNote = async(query)=> {
        try {
            const response = await axiosInstance.get("/serch-notes" ,{
                params: {query},
            });
            if(response.data && response.data.notes){
                setIsSerch(true);
                setAllNotes(response.data.notes)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id
        try {
            const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
               isPinned : !noteData.isPinned
            })
            if(response.data && response.data.note){
                showToastMessage("Note Updated Successfully")
                getallNote();
            }
        } catch (error) {
           console.log(error);
           
        }
    }

    const handleClearSerch = () => {
        setIsSerch(false);
        getallNote();

    };

    useEffect(() => {
        getallNote();
        getuserInfo();
        return () => { };
    }, []);

    return (
        <div>
            <Navbar userInfo={userInfo} onSerchNote={onSerchNote} handleClearSerch={handleClearSerch} />
            <div className="container mx-auto">
                {allNotes.length > 0 ? <div className="grid grid-cols-3 gap-4 mt-8">
                    {allNotes.map((item, index) => {
                        return (
                            <NoteCard
                                key={item._id}
                                title={item.title}
                                date={moment(item.createdOn).format('Do MMM YYYY')}
                                content={item.content}
                                tags={item.tags}
                                isPinned={item.isPinned}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => deleteNote(item)}
                                onPinNote={() => updateIsPinned(item)}
                            />
                        );
                    })}
                </div> : <EmptyCard imgSrc={isSerch ? NodataImg : AddNotesImg} message={isSerch ? `Oops! No Notes Found matching your Search` :`Start Creating your First note! Click the Add Buttone to jot Down your thoughts, ideas, and reminder. Let's get Started`} />}
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => { setOpenAddEditModel({ isShown: true, type: "add", data: null }); }}
            >
                <MdAdd className="text-[32] text-white" />
            </button>



            <Modal
                isOpen={openAddEditModel.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)"
                    },
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
            >
                <AddEditNote type={openAddEditModel.type} noteData={openAddEditModel.data} onClose={() => { setOpenAddEditModel({ isShown: false, type: "add", data: null }) }}
                    getallNote={getallNote}
                    showToastMessage={showToastMessage}
                />
            </Modal>


            <Tost
                isShown={showToastmgs.isShown}
                message={showToastmgs.message}
                type={showToastmgs.type}
                onClose={handleCloseToast}
            />

        </div>
    )
}

export default Home;