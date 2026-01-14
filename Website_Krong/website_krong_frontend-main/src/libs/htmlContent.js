export default function HtmlContent({ content }) {
  return (
    <div className="font-Siemreap">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
