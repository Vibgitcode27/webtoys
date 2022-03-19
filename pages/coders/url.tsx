import { useState } from 'react'
import { useLocalStorage } from '@/shared/storage'

import Page from '@/components/page'
import Segment from '@/components/segment'
import {
	Select,
	TextArea
} from '@/components/inputs'

import Icon from '@mdi/react'
import {
	mdiSwapHorizontal
} from '@mdi/js'


const Tool = () => {
	const [mode, setMode] = useLocalStorage('url-mode', 'encode')
	const [input, setInput] = useState('')
	let output = (() => {
		try {
			if (mode === 'encode') return encodeURIComponent(input)
			if (mode === 'decode') return decodeURIComponent(input)
		} catch(e) {
			return ''
		}
	})()

	return (
		<Page title='URL Encoder & Decoder'>
			<Segment
				type='config'
				items={[
					{
						icon: mdiSwapHorizontal,
						name: 'Conversion',
						description: 'Select which conversion mode you want to use',
						control: <Select value={mode} options={[
									{key: 'encode', value: "Encode"},
									{key: 'decode', value: "Decode"}
								]} onChange={(e: Event) => setMode((e.target as HTMLSelectElement).value)} />
					}
				]} />

			<Segment
				title='Input'
				controls={[
					{type: 'file', callback: (data: string) => setInput(data)},
					{type: 'clear', onClick: () => setInput('')}
				]}
				body={<TextArea value={input} onChange={(e: Event) => setInput((e.target as HTMLTextAreaElement).value)} rows={5} />}
			/>

			<Segment
				title='Output'
				controls={[{type: 'copy', data: output}]}
				body={<TextArea value={output} disabled={true} rows={5} />}
			/>
		</Page>
	)
}

export default Tool
