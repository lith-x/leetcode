# Generated with claude.ai
param(
    [Parameter(Mandatory=$true)]
    [int]$Day
)

$javacOutput = & javac "Day$Day.java" 2>&1

if ($javacOutput) {
    Write-Output $javacOutput
} else {
    & java "Day$Day"
    Remove-Item "*.class" -ErrorAction SilentlyContinue
}