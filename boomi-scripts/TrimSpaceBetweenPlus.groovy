import java.util.Properties
import java.io.InputStream
import java.io.ByteArrayInputStream

for (int i = 0; i < dataContext.getDataCount(); i++) {
    InputStream is = dataContext.getStream(i)
    Properties props = dataContext.getProperties(i)

    String document = new String(is.readAllBytes(), "UTF-8")

    // Remove whitespace sitting between + signs: "IV+ ++AMAZON" -> "IV+++AMAZON"
    document = document.replaceAll(/(?<=\+)\s+(?=\+)/, '')

    is = new ByteArrayInputStream(document.getBytes("UTF-8"))
    dataContext.storeStream(is, props)
}
