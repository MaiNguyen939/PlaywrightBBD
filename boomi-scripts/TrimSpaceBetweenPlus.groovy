import java.util.Properties
import java.io.InputStream
import java.io.ByteArrayInputStream

for (int i = 0; i < dataContext.getDataCount(); i++) {
    InputStream is = dataContext.getStream(i)
    Properties props = dataContext.getProperties(i)

    String document = new String(is.readAllBytes(), "UTF-8")

    // Remove whitespace AND invisible characters (zero-width space, NBSP, BOM, etc.) between + signs
    document = document.replaceAll(/(?<=\+)[\s\u200B\u200C\u200D\u2060\uFEFF\u00AD\u00A0]+(?=\+)/, '')

    is = new ByteArrayInputStream(document.getBytes("UTF-8"))
    dataContext.storeStream(is, props)
}
