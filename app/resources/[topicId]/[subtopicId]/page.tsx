
import { resourceTopics } from "../../../data/resourceTopics";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";


export default async function SubtopicPage({ params }: any) {
  const { topicId, subtopicId } = await params;

  // Find the topic
  const topic = resourceTopics.find((t) => t.id === topicId);
  if (!topic) return notFound();

  // Find the subtopic
  const subtopic = topic.subtopics.find((s) => s.id === subtopicId);
  if (!subtopic) return notFound();

  // Content may be empty – that's OK
  const content = subtopic.content || "Content coming soon…";

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold mb-4">{subtopic.title}</h1>

     <div className="prose prose-invert max-w-3xl">
  <ReactMarkdown>{content}</ReactMarkdown>
</div>

    </div>
  );
}
