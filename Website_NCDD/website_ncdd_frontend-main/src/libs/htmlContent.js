import { useLocale } from "next-intl";

export default function HtmlContent({ content, className, fontMoulSize }) {
  const locale = useLocale();

  function cleanHTML(html) {
    html = html.replace(/<font[^>]*>/gi, '').replace(/<\/font>/gi, '');
    html = html.replace(/font-family:\s*[^;"]+;?/gi, '');
    html = html.replace(/\b6pt\b/gi, '0pt');
    html = html.replace(/<img(?![^>]*class=)/gi, '<img class="mt-3"');
    html = html.replace(/\[([^\]]+)\]/g, `<span class="khmer-text-moul:${locale} ${fontMoulSize}">$1</span>`);
    html = html.replace(/style="([^"]*)"/gi, (match, styleContent) => {
      const styles = styleContent
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const filteredStyles = styles.filter(style => {
        const lower = style.toLowerCase();

        if (lower.startsWith('line-height:')) {
          return false;
        }

        if (lower.startsWith('font-size:')) {
          const sizeMatch = style.match(/font-size:\s*([\d.]+)px/i);
          if (sizeMatch) {
            const size = parseFloat(sizeMatch[1]);
            return size > 18;
          }
          return false;
        }
        return true;
      });

      if (filteredStyles.length > 0) {
        return `style="${filteredStyles.join('; ')}"`;
      } else {
        return '';
      }
    });

    return html;
  }

  return (
    <div
      className={`${className}`}
      dangerouslySetInnerHTML={{
        __html: cleanHTML(content).replaceAll(
          "<b>",
          `<b class="khmer-text-batb:${locale}">`
        ),
      }}
    />
  );
}
