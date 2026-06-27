import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RateLimitUI from "../components/RateLimitUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../libs/axios";
import NotesNotCreated from "../components/NotesNotCreated";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await api.get("/notes");
        setNotes(notes.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Something went wrong while fetching notes");
        }
      }finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading Notes ...
          </div>
        )}
        {!loading && notes.length === 0 && !isRateLimited && <NotesNotCreated />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
