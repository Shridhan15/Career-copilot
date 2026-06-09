import React, { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import PersonalInfoSection from "../components/profile/PersonalInfoSection";
import EducationSection from "../components/profile/EducationSection";

export default function UserProfile() {
  const { isLoaded, isSignedIn, user } = useUser();

  const [profileData, setProfileData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
    },
    education: [
      {
        id: Date.now(),
        institution: "",
        degree: "",
        startYear: "",
        endYear: "",
      },
    ],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- NEW: Fetch DB Profile OR Fallback to Clerk Data ---
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/user/${user.id}/profile`,
        );

        if (response.ok) {
          // 1. User has saved data in MongoDB. Load it.
          const data = await response.json();
          setProfileData(data);
        } else {
          // 2. No MongoDB data found (Brand new user).
          // Pre-fill the form using Clerk's authentication payload!
          setProfileData((prev) => ({
            ...prev,
            personalInfo: {
              ...prev.personalInfo,
              fullName: user.fullName || "",
              email: user.primaryEmailAddress?.emailAddress || "",
            },
          }));
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [isLoaded, isSignedIn, user]);

  // --- Handlers for Personal Info ---
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  // --- Handlers for Education Array ---
  const handleEducationChange = (id, field, value) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const addEducation = () => {
    setProfileData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          institution: "",
          degree: "",
          startYear: "",
          endYear: "",
        },
      ],
    }));
  };

  const removeEducation = (id) => {
    setProfileData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // --- REAL Database Save Function ---
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!isLoaded || !isSignedIn) {
      alert("You must be logged in to save your profile.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/user/${user.id}/profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        },
      );

      if (!response.ok) throw new Error("Network response was not ok");

      alert("Profile synchronized successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert(
        "Failed to save profile. Please check if the backend server is running.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Prevent flashing empty inputs while we check the database
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12 mt-4">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Profile Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your foundational details and academic history to better
          contextualize the AI agents.
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        <PersonalInfoSection
          data={profileData.personalInfo}
          onChange={handlePersonalInfoChange}
        />

        <EducationSection
          educationList={profileData.education}
          onChange={handleEducationChange}
          onAdd={addEducation}
          onRemove={removeEducation}
        />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-medium px-8 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isSaving ? "Synchronizing..." : "Save Profile Details"}
          </button>
        </div>
      </form>
    </div>
  );
}
