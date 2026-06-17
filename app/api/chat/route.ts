import { Mistral } from "@mistralai/mistralai"
import { NextResponse } from "next/server"

const client = new Mistral({
    apiKey: process.env.MISTRAL_API_KEY!,
})

const SYSTEM_PROMPT = `
Tu es Æon, conseiller officiel de voyages temporels.

Règles :
- Réponses en français
- Aucun Markdown (pas de ###, **, listes)
- Style fluide, premium, immersif
- 1 à 3 paragraphes maximum
- Toujours rester dans les voyages temporels :
  - Paris 1889
  - Florence 1504
  - Crétacé supérieur

Si hors sujet :
Refuse poliment et redirige vers les voyages temporels.
`

export async function POST(req: Request) {
    try {
        const { message } = await req.json()

        if (!message) {
            return NextResponse.json(
                { answer: "Message manquant dans la chronologie." },
                { status: 400 }
            )
        }

        const response = await client.chat.complete({
            model: "mistral-small-latest",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message },
            ],
        })

        // 🔥 FIX CRUCIAL : extraction safe
        const answer =
            response?.choices?.[0]?.message?.content ??
            "Je n’ai pas pu établir la connexion temporelle."

        return NextResponse.json({ answer })
    } catch (error) {
        console.error("Mistral error:", error)

        return NextResponse.json(
            {
                answer:
                    "Perturbation temporelle. Merci de réessayer.",
            },
            { status: 500 }
        )
    }
}