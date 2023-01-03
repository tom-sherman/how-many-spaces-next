import { ContentTable, ContentTableFooter } from "@/styles/components/Content"
import { KeyValue } from "@/types/Utility"

type TableProps = {
    data: KeyValue[],
    leftNote?: string|null,
    rightNote?: string|null,
}

export default function Table(props: TableProps) {
    const {
        data,
        leftNote,
        rightNote,
    } = props;

    return (
        <div>
            <ContentTable>
                <tbody>
                    {
                        data.map(({ key, value }, i) => (
                            <tr>
                                <td>{ key }</td>
                                <td>{ value }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </ContentTable>
            <ContentTableFooter>
                <span>{ leftNote }</span>
                <span>{ rightNote }</span>
            </ContentTableFooter>
        </div>
    )
}