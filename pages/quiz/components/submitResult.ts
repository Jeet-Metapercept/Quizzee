import type { ResultRow } from '~/utils/types/result.types';
import { QUIZ_STORE, props, user } from './Submit.vue';

export function submitResult() {
const attended = QUIZ_STORE.GET_ATTENDED_QUESTIONS;
const unattended = QUIZ_STORE.GET_UNATTENDED_QUESTIONS;
const meta = QUIZ_STORE.GET_QUIZ_META;
const endDate = meta.ended_at ? new Date(meta.ended_at.toString() as string) : null;
const startDate = meta.started_at ? new Date(meta.started_at.toString() as string) : null;
const time = endDate && startDate
? (endDate.getTime() - startDate.getTime()) / 60000
: 0;

const submission: Submission[] = QUIZ_STORE.GET_QUESTIONS.map(item => ({
question_id: item.id,
submitted_answers: item.submitted_answers?.map(answer => ({
is_selected: answer.is_selected,
text: answer.text,
})),
}));

const result: ResultRow = {
quiz_id: props.quiz?.id,
quiz_name: props.quiz?.name,
started_at: meta.started_at,
ended_at: meta.ended_at,
time_taken: Number(time.toFixed(2)),
allowed_duration: props.quiz?.max_time,
on_background: meta.leave_count,
max_q: props.quiz?.size,
attended,
unattended,
// correct: 26,
// incorrect: 4,
// precentage: 87.45,
user: user.value?.email,
// result_link: 'https link',
submission,
};

console.log(result);
}
