'use client'
import { GoogleGenAI } from "@google/genai"
import { useState } from "react"

export default function Home() {
  const [promptResponse, setPromptResponse] = useState("")
  const [userPrompt, setUserPrompt] = useState("")

  const prompt = async () => {
    const ai = new GoogleGenAI({ apiKey: "" })

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userPrompt,
      })

      const text = response.text
      if (!text) throw new Error("No response")
      console.log(response)

      setPromptResponse(text)
    } catch (err) {
      console.error(err)
    }
  }

  const handleUserInputChange = (e) => {
    setUserPrompt(e.target.value)
  }

  return (
    <div className="flex justify-center items-center flex-col gap-6">
      <input
        type="text"
        value={userPrompt}
        onChange={handleUserInputChange}
        className="w-[400px] h-[400px] bg-white text-black flex justify-baseline items-baseline p-4 text-2xl font-bold"
      />
      <button 
        onClick={prompt}
        className="border-2 border-white p-6 w-32 text-3xl font-bold"
      >
        Run
      </button>

      <p>{promptResponse}</p>
    </div>
  )
}
