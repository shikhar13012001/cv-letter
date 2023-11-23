#!/usr/bin/env node

/**
 * cv-letter
 * combine the resume and job description to create ai generated cover letter
 *
 * @author shikhar13012001 <https://portfolio-shikhar13012001.vercel.app/>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const selflatex = require('node-latex-pdf');
const fs = require('fs');
const openai = require('openai');
const openaiConfig = require('./openaiConfig.json'); // This file should contain your API key
const pdf = require('pdf-parse');
const openaiClient = new openai({
	apiKey: openaiConfig.apiKey
});

function readFileSync(filePath) {
	return fs.readFileSync(filePath, { encoding: 'utf8' });
}
async function readPdf(filePath) {
	let dataBuffer = fs.readFileSync(filePath);

	const data = await pdf(dataBuffer);
	return data.text;
}
function writeFileSync(filePath, content) {
	fs.writeFileSync(filePath, content, { encoding: 'utf8' });
}
const input = cli.input;
const flags = cli.flags;
const { clear, debug, wordLimit } = flags;

async function generateCoverLetterContent(
	jobDescription,
	resumeText,
	templateCode
) {
	log('Generating content...');
	try {
		const response = await openaiClient.chat.completions.create({
			messages: [
				{
					role: 'system',
					content:
						'You are an expert reume coverletter writer. You are helping a friend write a cover letter for a job application.'
				},
				{
					role: 'user',
					content: `write a cover letter in latex for the following job description, you will be provided with resume of the user and the template cover letter latex code, you will provide complete code of the latex and  write the important changes, you will not provide any extra text or markdown backticks, plaintext with codeonly,  only the main solution and highlight important information such as email contact, company names, tech stack and etc. \n\n
				JOB DESCRIPTION:${jobDescription}\n\n
				RESUME TEXT:${resumeText},
				TEMPLATE CODE:${templateCode}
				`
				}
			],
			model: 'gpt-3.5-turbo'
		});

		const responseText=response.choices[0].message.content.trim();
		// remove first and last line of responseText
		const responseTextLines = responseText.split('\n');
		responseTextLines.shift();
		responseTextLines.pop();
		const responseTextWithoutFirstAndLastLine = responseTextLines.join('\n');

		return responseTextWithoutFirstAndLastLine;
	} catch (error) {
		console.error('Error in generating content:', error.message);
		return '';
	}
}

async function processCoverLetter(
	jobDescriptionPath,
	coverLetterPath,
	resumePath
) {
	const jobDescription = readFileSync(jobDescriptionPath);
	const coverLetter = readFileSync(coverLetterPath);
	const resumeText = await readPdf(resumePath); 

	// Generate new content from job description
	const newContent = await generateCoverLetterContent(
		jobDescription,
		resumeText,
		coverLetter
	);
	// change the cover letter content
	writeFileSync(coverLetterPath, newContent);
	log(coverLetterPath, newContent);
	// create spawn process to generate pdf
	const child = require('child_process').spawn('pdflatex', [
		coverLetterPath
	]);
	child.stdout.on('data', function(data) {
		log('stdout: ' + data);
	});
	child.stderr.on('data', function(data) {
		log('stderr: ' + data);
	});
	child.on('close', function(code) {
		log('closing code: ' + code);
	});

}

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	input.includes(`version`) && cli.showVersion(0);

	const jobDescriptionPath = input[0];
	const coverLetterPath = input[1];
	const resumePath = input[2];

	if (!jobDescriptionPath || !coverLetterPath) {
		log('Please provide the job description and cover letter path');
		return;
	}

	await processCoverLetter(jobDescriptionPath, coverLetterPath, resumePath);
	debug && log(flags);
})();
