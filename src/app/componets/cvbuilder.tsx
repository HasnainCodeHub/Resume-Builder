"use client"
import Link from 'next/link'
import { FaGithubSquare } from "react-icons/fa";
import React, { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { PlusCircle, X, Download,  } from 'lucide-react'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'


type ResumeData = {
  name: string
  email: string
  phone: string
  summary: string
  experience: string
  education: string
  skills: string[]
  picture: string
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experience: '',
    education: '',
    skills: [],
    picture: '',
  })
  const [currentSkill, setCurrentSkill] = useState('')
  const resumeRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setResumeData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddSkill = () => {
    if (currentSkill.trim() !== '') {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, currentSkill.trim()] }))
      setCurrentSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter(skill => skill !== skillToRemove) }))
  }

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setResumeData(prev => ({ ...prev, picture: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadPDF = async () => {
    if (resumeRef.current) {
      const canvas = await toPng(resumeRef.current, { quality: 0.95 })
      const pdf = new jsPDF()
      pdf.addImage(canvas, 'PNG', 0, 0, 210, 297)
      pdf.save('resume.pdf')
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Professional Resume Builder</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 bg-white shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Enter Your Details</h2>
          <div className="space-y-4">
            <Input name="name" placeholder="Full Name" onChange={handleInputChange} />
            <Input name="email" type="email" placeholder="Email" onChange={handleInputChange} />
            <Input name="phone" placeholder="Phone" onChange={handleInputChange} />
            <Textarea name="summary" placeholder="Professional Summary" onChange={handleInputChange} />
            <Textarea name="experience" placeholder="Work Experience" onChange={handleInputChange} />
            <Textarea name="education" placeholder="Education" onChange={handleInputChange} />
            <div className="flex space-x-2">
              <Input
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <Button onClick={handleAddSkill} variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
              <Input type="file" accept="image/*" onChange={handlePictureChange} />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-white shadow-lg" ref={resumeRef}>
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Resume Preview</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {resumeData.picture && (
                <img src={resumeData.picture} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-primary" />
              )}
              <div>
                <h3 className="text-3xl font-bold text-primary">{resumeData.name}</h3>
                <p className="text-gray-600">{resumeData.email} | {resumeData.phone}</p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-green-600 border-b-2 border-green-600 pb-1 mb-2">Professional Summary</h4>
              <p className="text-gray-700">{resumeData.summary}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-1 mb-2">Work Experience</h4>
              <p className="text-gray-700 whitespace-pre-line">{resumeData.experience}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-purple-600 border-b-2 border-purple-600 pb-1 mb-2">Education</h4>
              <p className="text-gray-700 whitespace-pre-line">{resumeData.education}</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-orange-600 border-b-2 border-orange-600 pb-1 mb-2">Skills</h4>
              <ul className="list-disc pl-5 text-gray-700">
                {resumeData.skills.map((skill, index) => (
                  <li key={index} className="flex items-center justify-between">
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-8 text-center">
        <Button onClick={downloadPDF} className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded">
          <Download className="h-5 w-5 mr-2" />
          Download as PDF
        </Button>
        <br />
        <p className='mt-8'>{"<"}Hasnain's Coding World{">"}</p>
        <div className="flex justify-center mt-4 ">
        <FaGithubSquare
          size={55}
          className=" "
        />
        <button className=" bg-black rounded-xl  h-14 text-white text-2xl font-serif p-1 transition-transform duration-300 hover:scale-110">
          <Link
            href="https://github.com/HasnainCodeHub?tab=repositories"
            target="_blank"
          >
            Github Account
          </Link>
        </button>
      </div>

      </div>
    </div>
  )
}