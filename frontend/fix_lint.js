const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
    { file: 'App.tsx', regex: /,\s*Progress/, replace: '' },
    { file: 'App.tsx', regex: /Progress,\s*/, replace: '' },
    { file: 'components/common/command.tsx', regex: /\/\/\s*eslint-disable-next-line\s*@typescript-eslint\/no-empty-object-type\n?/, replace: '' },
    { file: 'components/features/body/BodyAnalysisCard.tsx', regex: /,\s*Dumbbell/, replace: '' },
    { file: 'components/features/body/BodyAnalysisCard.tsx', regex: /Dumbbell,\s*/, replace: '' },
    { file: 'components/features/body/LoadingAnalysis.tsx', regex: /const messages = \[[\s\S]*?\];\s*/, replace: '' },
    { file: 'components/features/camera/CameraCapture.tsx', regex: /,\s*Camera/, replace: '' },
    { file: 'components/features/camera/CameraCapture.tsx', regex: /Camera,\s*/, replace: '' },
    { file: 'components/features/coach/TrainerCard.tsx', regex: /,\s*onViewProfile/, replace: '' },
    { file: 'components/layout/AuthLayout.tsx', regex: /,\s*noHeader = false/, replace: '' },
    { file: 'context/AuthContext.tsx', regex: /.catch\(err => {/, replace: '.catch(_err => {' },
    { file: 'hooks/use-toast.ts', regex: /const actionTypes = {\n\s*ADD_TOAST: "ADD_TOAST",\n\s*UPDATE_TOAST: "UPDATE_TOAST",\n\s*DISMISS_TOAST: "DISMISS_TOAST",\n\s*REMOVE_TOAST: "REMOVE_TOAST",\n} as const;/g, replace: '' },
    { file: 'pages/GoalSelection.tsx', regex: /,\s*Card/, replace: '' },
    { file: 'pages/GoalSelection.tsx', regex: /Card,\s*/, replace: '' },
    { file: 'pages/Index.tsx', regex: /,\s*ArrowRight/, replace: '' },
    { file: 'pages/Index.tsx', regex: /ArrowRight,\s*/, replace: '' },
    { file: 'pages/LogMeal.tsx', regex: /,\s*Upload/, replace: '' },
    { file: 'pages/LogMeal.tsx', regex: /Upload,\s*/, replace: '' },
    { file: 'pages/Plans.tsx', regex: /const handleSubscribe = \(id: string | number\) => {/, replace: 'const handleSubscribe = (_id: string | number) => {' },
    { file: 'pages/Shop.tsx', regex: /,\s*Minus,\s*Plus/, replace: '' },
    { file: 'pages/Shop.tsx', regex: /Minus,\s*Plus,\s*/, replace: '' }
];

replacements.forEach(({ file, regex, replace }) => {
    const filePath = path.join(srcDir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(regex, replace);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${filePath}`);
    }
});
